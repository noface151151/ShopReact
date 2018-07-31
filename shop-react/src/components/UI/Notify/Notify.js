import { notification } from 'antd';

const NotificationWithIcon = (props)=>{
    notification[props.type]({
        message: props.message,
        description: props.description,
        onClose:props.Close
      });
}

export default NotificationWithIcon;