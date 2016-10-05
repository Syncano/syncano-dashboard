import dedent from 'dedent';

const sampleScripts = {
  send_message: {
    label: 'send_message',
    description: 'Sample script - Twilio SMS messaging',
    runtime_name: 'python_library_v5.0',
    config: {
      api_key: 'api_key',
      instance_name: 'instance_name',
      from_number: 'your_twilio_number',
      account_sid: 'twilio_account_sid',
      auth_token: 'twilio_auth_token',
      class_name: 'class_name',
      to_number: 'to_number',
      body: 'message_body'
    },
    source: `
      from twilio.rest import TwilioRestClient
      from syncano.models.base import Object
      from syncano.models import Class
      import syncano

      
      # # # use config to provide data
      from_number = CONFIG["from_number"]
      to_number = CONFIG["to_number"]
      body = CONFIG["body"]
      class_name = CONFIG["class_name"]
      api_key = CONFIG["api_key"]
      # media_url = CONFIG["media_url"]
      instance_name = CONFIG["instance_name"]
      # Make connection to Syncano
      syncano.connect(api_key=api_key)

      # Your Twilio Account Sid and Auth Token from twilio.com/user/account
      account_sid = CONFIG["account_sid"]
      auth_token = CONFIG["auth_token"]
      client = TwilioRestClient(account_sid, auth_token)  # connect with twilio

      try:
        Class.please.get(instance_name=instance_name, name=class_name)
      except Class.DoesNotExist:
        Class.please.create(
            instance_name=instance_name, 
            name=class_name, 
            schema=[
                {"name": "message", "type": "string"},
                {"name": "to_number", "type": "string"},
                # {"name": "image_url", "type": "file"},
                {"name": "from_number", "type": "string"}        
            ])

      message_body = CONFIG['body'] # provided in Config
      # media_url = CONFIG['media_url']  # 'media_url' -- gif, jpeg, or png
      to_number = CONFIG['to_number']  # 'to_number' is receiving number, ie; "+13475555717"
      if to_number is None:
          raise ValueError("You didn't pass to_number")
      elif message_body is None:
          raise ValueError("You didn't pass any 'body' or 'media_url'")
      from_number = from_number  

      message = client.messages.create(body=message_body,
                                       # media_url=media_url,
                                       to=to_number,
                                       from_=from_number)
      message_sid = message.sid  # id of message for looking up with twilio

      # We store the message in syncano
      stored_message = Object.please.create(class_name=class_name,
                                            message=message_body,
                                            to_number=to_number,
                                            # image_url=media_url,
                                            message_sid=message_sid,
                                            instance_name=instance_name)

      `
  },
  get_weather: {
    label: 'get_weather',
    description: 'Sample script - Get Weather for specified location',
    runtime_name: 'python_library_v5.0',
    config: {
      city: 'Houston',
      state: 'TX'
    },
    source: `
      import urllib2, urllib, json

      # extract city and state from the ARGS
      # if none are passed, it will raise an error
      # you can pass those ARGS e.g. in a webhook by calling
      # https://api.syncano.io/v1/instances/<instance>/webhooks/p/<public_link>/?city=brooklyn&state=ny
      # or in a direct CodeBox call: CodeBox.please.run(instance_name='YOUR_INSTANCE_NAME', 
      # id=the_CodeBox_id, payload={'city': 'Burlington', 'state': 'VT'})

       # # # use config to provide data
      city = CONFIG["city"]
      state = CONFIG["state"]

      if city is None and state is None:
          raise ValueError("Parameters 'city' and 'state' were not found")
      elif city is None:
          raise ValueError("Parameter 'city' was not found")
      elif state is None:
          raise ValueError("Parameter 'state' was not found")

      # base url of Yahoo Weather API
      base_url = "https://query.yahooapis.com/v1/public/yql?"

      # query to perform on the Yahoo Weather API
      # if you're not interested in getting the full response
      # replace "select *" with a more detailed query
      # e.g. "select item.condition.text" to get a one word forecast
      yql_query = "select item.forecast from weather.forecast where woeid in (select woeid ` +
      `from geo.places(1) where text='{city}, {state}')".format(city=city, state=state)
      url_with_query = base_url + urllib.urlencode({'q':yql_query}) + "&format=json"
      result = urllib2.urlopen(url_with_query).read()

      # we want to extract the forecast from weather data
      data = json.loads(result)
      forecasts = []
      channels = data['query']['results']['channel']
      for channel in channels:
       forecasts.append(channel['item']['forecast'])

      print json.dumps(forecasts)

      '''sample usage in python

      from syncano.models.base import *
      import syncano

      syncano.connect(api_key='API KEY')
      CodeBox.please.run(instance_name='YOUR_INSTANCE_NAME',
                         id=the_CodeBox_id,
                         payload={'city': 'Houston', 'state': 'TX'})
      '''
      `
  },
  youtube_search: {
    label: 'youtube_search',
    description: 'Sample script - Youtube search engine',
    runtime_name: 'python_library_v5.0',
    config: {
      query: 'query_name',
      max_results: 'max_results (0-10)',
      api_key: 'api_key',
      order: 'order',
      developer_key: 'youtube_api_key',
      instance_name: 'instance_name',
      class_name: 'class_name'
    },
    source: `
      from apiclient.discovery import build
      from apiclient.errors import HttpError
      from oauth2client.tools import argparser
      from syncano.models import Object
      from syncano.models import Class
      import syncano

      # Make google developer account here, follow instructions to get
      # the google DEVELOPER_KEY
      # https://developers.google.com/youtube/v3/getting-started
      DEVELOPER_KEY = CONFIG["developer_key"]
      YOUTUBE_API_SERVICE_NAME = "youtube"
      YOUTUBE_API_VERSION = "v3"

      api_key = CONFIG["api_key"]
      syncano.connect(api_key=api_key)

      order = CONFIG["order"] # order can be date / rating / relevance / title / viewCount
      query = CONFIG["query"]
      max_results = CONFIG["max_results"]
      instance_name = CONFIG["instance_name"]
      class_name = CONFIG["class_name"]

      if query is None:
          raise ValueError("You did not pass 'query'")

      try:
          Class.please.get(instance_name=instance_name, name=class_name)
      except Class.DoesNotExist:
          Class.please.create(
              instance_name=instance_name, 
              name=class_name, 
              schema=[
                  {"name": "title", "type": "text"},
                  {"name": "description", "type": "text"}
              ])

      def youtube_search(query, order, max_results):
          youtube = build(YOUTUBE_API_SERVICE_NAME,
                          YOUTUBE_API_VERSION,
                          developerKey=DEVELOPER_KEY)

          # Call the search.list method to retrieve results matching the specified
          # query term.
          # https://developers.google.com/youtube/v3/guides/implementation/search
          # https://developers.google.com/youtube/v3/docs/search/list
          # maxResults can be 0-50
          # order can = date / rating / relevance / title / viewCount
          search_response = youtube.search().list(q=query,
                                                  part="id,snippet",
                                                  maxResults=max_results,
                                                  order=order
                                                  ).execute()

          videos = search_response.get('items', [])


          for video in videos:
              if video['id']['kind'] == 'youtube#video':
                  title = video['snippet']['title']
                  # 'default', 'medium', and 'high' are the resolutions you can pick
                  thumbnail = video['snippet']['thumbnails']['medium']
                  description = video['snippet']['description']
                  video_id = video['id']['videoId']
                  video_url = "https://www.youtube.com/watch?v=" + video_id
                  Object.please.create(
                                      instance_name=instance_name,
                                      class_name=class_name,
                                      title=title,
                                      thumbnail=thumbnail,
                                      description=description,
                                      video_id=video_id,
                                      video_url=video_url,
                                      query=query
                                      )
                  print "Saved video [%s] in data class: %s" % (title,class_name)
              else:
                  pass

      try:
          youtube_search(query, order, max_results)
      except HttpError, e:
          print "An HTTP error %d occurred:%s" % (e.resp.status, e.content)
    `
  },
  slack_giphy_bot: {
    label: 'slack_giphy_bot',
    description: 'Sample script - Slack Giphy Bot',
    runtime_name: 'python_library_v5.0',
    config: {
      slack_hook_url: 'slack_hook_url',
      slack_channel: 'slack_channel',
      slack_username: 'slack_username',
      slack_message: 'slack_message',
      giphy_url: 'giphy_url',
      slack_icon_emoji: 'slack_icon_emoji'
    },
    source: `
      import json
      import requests

      giphy_url = CONFIG["giphy_url"] # eg. http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC&limit=1
      slack_hook_url = CONFIG["slack_hook_url"]
      slack_channel = CONFIG["slack_channel"]
      slack_username = CONFIG["slack_username"]
      slack_icon_emoji = CONFIG["slack_icon_emoji"] # example: :ghost:
      slack_message = CONFIG["slack_message"]

      if not slack_hook_url:
          raise Exception('Config for "slack_hook_url" is required')

      if not slack_channel:
          raise Exception('Config for "slack_channel" is required')

      headers = {'content-type': 'application/json'}
      response = requests.get(giphy_url, headers=headers, timeout=5)
      response = response.json()
      gif = response['data'][0]['images']['fixed_height_small']['url']


      messages = (slack_message, gif)
      combined_message = ' '.join(messages)


      payload = {
          "channel": slack_channel,
          "username": slack_username,
          "text": combined_message,
          "icon_emoji": slack_icon_emoji
      }

      requests.post(slack_hook_url, data=json.dumps(payload), headers=headers, timeout=5)
      `
  },
  qrcode_generator: {
    label: 'qrcode_generator',
    description: 'Sample script - BCrypt password verification',
    runtime_name: 'python_library_v5.0',
    config: {
      data: 'data',
      class_name: 'class_name',
      api_key: 'api_key',
      instance_name: 'instance_name'
    },
    source: `
      from syncano.models import Object
      from syncano.models import Class
      from qrcode import *
      import syncano
      import StringIO

      api_key = CONFIG["api_key"]
      syncano.connect(api_key=api_key)

      # Get Unique Data for solution from ARGs
      # Unique data can be any String
      data = CONFIG["data"]
      if data is None:
        raise ValueError("You did not pass any data for the QRCode")

      # version is size, read more on parameters here
      # https://pypi.python.org/pypi/qrcode
      qr = QRCode(version=5, error_correction=ERROR_CORRECT_L)  # Generate QRCode object
      qr.add_data(data)  # Adds QR code data 

      qr.make() # Generate the QRCode itself

      # Generate and save image as StringIO file
      image = qr.make_image() 
      output = StringIO.StringIO()
      image.save(output)
      contents = output.getvalue()
      output.close()

      class_name = CONFIG["class_name"]
      instance_name = CONFIG["instance_name"]

      try:
          Class.please.get(instance_name=instance_name, name=class_name)
      except Class.DoesNotExist:
          Class.please.create(
              instance_name=instance_name, 
              name=class_name, 
              schema=[
                  {"name": "image", "type": "file"},
                  {"name": "data", "type": "string"}
          ])

      # Save QRCode image to Syncano data class "class_name"
      new_object = Object.please.create(instance_name=instance_name,
                           class_name=class_name,
                           image=contents,
                           data=data)

      print("You can find your QRCODE here: {}").format(new_object.image)

      # SYNTAX TO RUN THIS CODEBOX FROM THE PYTHON LIBRARY
      '''
      from syncano.models.base import *
      import syncano

      syncano.connect(api_key='your_api_key')

      data = "Username: Sansa Stark"
      CodeBox.please.run(id=CODEBOX_ID,
                         instance_name=INSTANCE_NAME,
                         payload={'data': 'House Stark'})
      '''
      `
  },
  sms_notification: {
    label: 'sms_notification',
    description: 'Sample script - Twilio SMS messaging',
    runtime_name: 'nodejs_library_v1.0',
    config: {
      from: '+1XXXXXXXXXX',
      to: '+1XXXXXXXXXX',
      body: 'Some text'
    },
    source: `
      // This sample script using Twilio - platform for building Voice & Messaging applications

      var Twilio = require('machinepack-twilio');

      // Send a message using the Twilio API
      Twilio.sendMessage({
      accountSid: 'AC645d1e06eb6df80a62082947e93f84ac',
      authToken: '1d8bb44018099a300d68c64bdafad337',
      from: CONFIG["from"],
      to: CONFIG["to"],
      body: CONFIG["body"]
      }).exec({
      // An unexpected error occurred.
      error: function (error){
        console.log(error)
      },
      // No sender ("From") phone numbers are available to your Twilio account.
      noPhoneNumbersAvailable: function (){
          console.log('There is no phone numbers available')
      },
      // Either a "body" or "mediaUrl" (or both) must be specified
      noBodyOrMediaSpecified: function (){
          console.log('There is no body or mediaUrl specified')
      },
      // OK.
      success: function (result){
          console.log(result)
      },
      });`
  },
  email_confirmation: {
    label: 'email_confirmation',
    runtime_name: 'nodejs_library_v1.0',
    description: 'Sample script - Mailgun email confirmation',
    config: {
      from: '+1XXXXXXXXXX',
      to: '+1XXXXXXXXXX',
      subject: 'Welcome to Syncano!',
      text: 'Confirm your registration!'
    },
    source: `
      // This sample script using Mailgun - Email Service For Developers

      // Register on www.mailgun.com and specify your api_key and domain
      var mailgun = require('mailgun-js')({apiKey: "key-XXXXXXXXXXXXXXXXXX", domain: "XXXXXXXXXXXXXXXXXX"});

      // Sample registration confirmation email
      var emailConfig = {
        from: CONFIG["email_from"],
        to: CONFIG["email_to"],
        subject: CONFIG["email_subject"],
        text: CONFIG["email_body"]
      };

      mailgun.messages().send(emailConfig, function (error) {
        console.log(error);
      });`
  },
  slack_bot: {
    label: 'slack_bot',
    description: 'Sample script - Slack Bot',
    runtime_name: 'nodejs_library_v1.0',
    config: {
      channel: '#XXXXX',
      message: 'Hi, I am SlackBot',
      username: 'SlackBot',
      iconEmoji: ':ghost:'
    },
    source: `
      // Remember to fill all fields in CONFIG and specify Slack channel which you want to notify

      var Slack = require('machinepack-slack');

      // Add Incoming WebHooks Application to your Slack
      // https://syncano.slack.com/apps/A0F7XDUAZ-incoming-webhooks

      Slack.postToChannel({
          webhookUrl: 'https://hooks.slack.com/services/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',
          channel: CONFIG["channel"],
          message: CONFIG["message"],
          username: CONFIG["username"],
          iconEmoji: CONFIG["iconEmoji"],
          linkNames: true,
      }).exec({
      // An unexpected error occurred.
      error: function (error){
        console.log(error);
      },
      // Specified subdomain and webhook token combination does not match any known Slack accounts
      notFound: function (error){
        console.log('Webhook token and subdomain does not match any known Slack accounts');
      },
      // OK.
      success: function (result){
        console.log(result);
      },
      });`
  },
  password_verification: {
    label: 'password_verification',
    description: 'Sample script - BCrypt password verification',
    runtime_name: 'nodejs_library_v1.0',
    config: {
      passwordAttempt: 'XXXXXXX',
      encryptedPassword: 'XXXXXXX'
    },
    source: `
      //Useful for checking a password attempt against the stored, already-encrypted BCrypt hash.
      var Passwords = require('machinepack-passwords');

      // Compare a plaintext password attempt against an already-encrypted version.
      Passwords.checkPassword({
      passwordAttempt: CONFIG["passwordAttempt"],
      encryptedPassword: CONFIG["encryptedPassword"],
      }).exec({
      // An unexpected error occurred.
      error: function (err){
          return 'Unexpected error - check input value'
      },
      // Password attempt does not match already-encrypted version
      incorrect: function (error){
        console.log(error);
      },
      // OK.
      success: function (result){
        console.log(result);
      },
      });`
  },
  zendesk_ticket_creating: {
    label: 'zendesk_ticket_creating',
    description: 'Sample script - Zendesk ticket creating',
    runtime_name: 'nodejs_library_v1.0',
    config: {
      username: 'XXXX@xxxx.com',
      token: 'XXXXXXXXXXXXXX',
      requestorName: 'XXXXXXXXXXXXXX',
      requestorEmail: 'XXXX@xxxx.com'
    },
    source: `
      // This sample script using Zendesk - Customer Service Software & Support Ticket System

      var Zendesk = require('machinepack-zendesk');

      // Log a hello message with a generated secret code and other information
      Zendesk.createTicket({
      username: CONFIG["username"],
      token: CONFIG["token"],
      remoteUri: 'https://machines.zendesk.com/api/v2',
      requestorName: CONFIG["requestorName"],
      requestorEmail: CONFIG["requestorEmail"],
      subject: 'I need help with assembly',
      tags: [],
      comment: 'When I opened the box the parts were missing. I need new parts.',
      }).exec({
      // An unexpected error occurred.
      error: function (error){
        console.log(error);
      },
      // OK.
      success: function (result){
        console.log(result);
      },
      });`
  }
};

export default sampleScripts;

const getSampleScript = (scriptKey) => {
  const script = sampleScripts[scriptKey];

  return script && {
    ...script,
    source: script && dedent(script.source)
  };
};

export { getSampleScript };
