import dedent from 'dedent';

// Exported default content that is used in Templates
const content = {
  html: dedent`
    <style> 
    {# You can add referrences to these classes in the CONTEXT field #}
    {# eg. "table_classes": "table" or "style_the_table"#}
    .table {
        margin: 0 auto;
        min-width: 600px;
    }
    .table tr {  
        background-color: #ebf1fe;
    }
    .table tr:nth-child(odd) {
        background-color: #f6f6f6;
    }
    .table th {
        text-transform: capitalize;
        background-color: #244273;
        color: #FFF;
        padding: 1em;
    }
    .table td {
        display: table-cell;
        max-width: 7em;
        word-wrap: break-word;
        padding: 1em;
    }        
    </style>
    
    {# Lines 29-33 check what kind of response we get #}
    {% if action == 'list' %}
        {% set objects = response.objects %} {# gets data from URL #}
    {% else %}
        {% set objects = objects %} {#gets data from context #}
    {% endif %}

    {% if objects %} {# assigns the response to objects variable #}
        {# checks if table_classes is defined, and then gives it a class name #}
        <table{% if table_classes %} class="{{ table_classes }}"{% endif %}>
            <tr{% if tr_header_classes %} class="{{ tr_header_classes }}"{% endif %}> 
            {# checks if key is supposed to be skipped, then returns the rest #}
            {% for key in objects[0] if key not in fields_to_skip %}
                <th{% if th_header_classes %} class="{{ th_header_classes }}"{% endif %}>{{ key }}</th>
            {% endfor %}
            </tr>
        {% for object in objects %}
            <tr{% if tr_row_classes %} class="{{ tr_row_classes }}"{% endif %}>
            {# iterating through key and value in received objects, checks if key is supposed to be skipped #}
            {% for key, value in object.iteritems() if key not in fields_to_skip %}
                <td{% if td_row_classes %} class="{{ td_row_classes }}"{% endif %}>{{ value }}</td>
            {% endfor %}
            </tr>
        {% endfor %}
        </table>
    {% endif %}`,
  json: dedent`
  {# Lines 2-8 check what kind of response we get #}
  {% if action == 'list' %}
      {% set objects = response.objects %}
  {% elif action == 'retrieve' %}
      {% set objects = [response] %}
  {% else %}
      {% set objects = objects %}
  {% endif %}
  {# this is how we can create a simple logic to iterate through the objects in Context or Data URL #}
  {# We prepare an object #}
  {
    "Our response": [
      {# we loop in objects #}
      {% for object in objects %}
      {# we now want to receive separated objects #}
      {# it comes from Data URL (if possible) or Context (if no Data Url provided) #}
      {{ object }},
      {# last iteration #}
      {% if loop.last %}
      {# we can also add additional objects from Context (specify the name) #}
      {{ additionalObjects }}
      {% endif %}
      {% endfor %}
    ]
}`
};

const context = {
  html: {
    objects: [
      {
        gif: 'http://bit.ly/1q6BjD2',
        id: 1,
        rank: 1,
        description: 'CatNumber1'
      },
      {
        gif: 'http://bit.ly/1TC9LBr',
        id: 2,
        rank: 2,
        description: 'CatNumber2'
      },
      {
        gif: 'http://bit.ly/1Vx7M1g',
        id: 3,
        rank: 3,
        description: 'CatNumber3'
      },
      {
        gif: 'http://bit.ly/1SABmyb',
        id: 4,
        rank: 4,
        description: 'CatNumber4'
      },
      {
        gif: 'http://bit.ly/1SQ3waZ',
        id: 5,
        rank: 5,
        description: 'CatNumber5'
      }
    ],
    fields_to_skip: [
      'channel',
      'channel_room',
      'group',
      'group_permissions',
      'owner_permissions',
      'other_permissions',
      'owner',
      'revision',
      'updated_at',
      'created_at'
    ],
    table_classes: 'table'
  },
  json: {
    objects: [
      {
        id: 1,
        name: 'car'
      },
      {
        id: 2,
        name: 'bike'
      }
    ],
    additionalObjects: [
      {
        id: 3,
        name: 'phone'
      },
      {
        id: 4,
        name: 'computer'
      }
    ]
  }
};

export default {
  content,
  context
};
