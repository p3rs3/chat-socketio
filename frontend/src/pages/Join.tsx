import { useEffect } from 'react';
import { Form, Input, Button, Col, Row, message } from 'antd';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { RouteNames } from '../router';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';

const JoinContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
align-self: center;
width: 80%;
`

const Subtitle = styled.div`
text-transform: uppercase;
font-weight: 600;
font-size: 16px;
margin-bottom: 26px;
`;

export const Join = () => {
    const { setUsername, setConnection } = useActions();
    const { username, room, socket, isConnected, connectError } = useTypedSelector(state => state.socketConnectionReducer);
    const history = useHistory();

    useEffect(() => {
        if (room && socket && username && isConnected) {
            history.push(RouteNames.ROOM);
        }
    }, [isConnected]);

    useEffect(() => {
        if (connectError.status) {
            message.error('An error has occurred');
        }
    }, [connectError]);

    const onFinish = () => {
        setConnection(username, room);
    };

    const onInputChange = (event: any) => {
        setUsername(event.target.value);
    }

    return (
        <JoinContainer>
            <Subtitle>
                Input your name to enter the room
            </Subtitle>
            <Form
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input value={username} onChange={onInputChange}/>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 10, span: 4 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </JoinContainer>
    );
}