import * as moment from 'moment-timezone';
import 'moment/locale/fr';
moment.locale('fr');
moment.tz('Europe/Paris');
export const MomentJs = moment;
