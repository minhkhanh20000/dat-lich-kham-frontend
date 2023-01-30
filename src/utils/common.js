import moment from 'moment';
import { toast } from 'react-toastify';

export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const toastify = (type, label) => {
  switch (type) {
    case 'success': {
      toast.success(label, {
        position: 'top-right',
        autoClose: 1000,
      });
      break;
    }
    case 'error': {
      toast.error(label, {
        position: 'top-left',
        autoClose: 1000,
      });
      break;
    }
    default:
      break;
  }
};

export const formatDate = (date) => {
  return moment(date).format('YYYY-MM-DD');
};

export const ruleUser = {
  ADMIN: 'admin',
  USER: 'user',
  BACSI: 'bacsi',
};

export const optionsRule = [
  {
    value: 'admin',
    label: 'Admin',
  },
  {
    value: 'user',
    label: 'Người dùng',
  },
  {
    value: 'bacsi',
    label: 'Bác sĩ',
  },
];
