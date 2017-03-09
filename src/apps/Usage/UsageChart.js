import { asyncComponent } from 'react-async-loading';

export default asyncComponent(() => System.import('../Profile/ProfileBillingChart.js'));
