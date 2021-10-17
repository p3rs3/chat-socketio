import { Form, Input } from 'antd';
import { useTypedSelector } from '../../hooks/useTypedSelector';

export const MessageInput = () => {
    const { socket } = useTypedSelector(state => state.socketConnectionReducer);
    const [messageForm] = Form.useForm();


    const onMessageInput = (e: {message: string}) => {
        if (e.message) {
            if (!e.message.trim()) {
                return;
            }

            socket.emit('onMessage', e.message);
            messageForm.resetFields();
        }
    }

    return (
        <Form
        form={messageForm}
        onFinish={onMessageInput}
        style={{width: '85%'}}
        >
            <Form.Item
            name='message'
            >
                <Input allowClear={true} />
            </Form.Item>
        </Form>
    );
}