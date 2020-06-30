import { TrackingAction } from 'types';

const isTrackingAction = (action: any): action is TrackingAction =>
  ['github', 'pdf', 'print', 'visit'].includes(action);

export default isTrackingAction;
