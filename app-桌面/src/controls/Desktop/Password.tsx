import React, { Fragment, useState, useCallback, useLayoutEffect, useContext } from 'react';
import { Input, Row, Col, Form, Button, Icon, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { useMove } from './dnd'
import { fetchChangePassword } from './service';
import S from './password.module.scss';
import S1 from './style.module.scss';

interface PasswordProps extends FormComponentProps {
    clearModalType: () => void
    userInfo: UserInfo
}

const formItemLayout = {
    labelCol: {
        xs: { span: 12 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 12 },
        sm: { span: 16 },
    },
};
const submitFormLayout = {
    wrapperCol: {
        xs: { span: 10 },
        sm: { span: 16, offset: 6 },
    },
}



const UpdatePassword: React.FC<PasswordProps> = (props) => {
    const {
        form,
        clearModalType,
        userInfo
    } = props;

    const {
        getFieldDecorator
    } = form;

    const [confirmDirty, setConfirmDirty] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = (e: React.MouseEvent) => {
        form.validateFields((err, values) => {
            if (!err) {
                const { password, newPassword, confirm } = values;
                const { username } = userInfo;
                const options = {
                    prepassword: password,
                    password: newPassword,
                    repassword: confirm,
                    username
                };
                fetchChangePassword(options)
                    .then((res: any) => {
                        if (res.data) {
                            message.success('修改成功');
                            handleCancel({} as React.MouseEvent);
                            location.href = '/#/user/login'
                        } else {
                            setErrorMsg(res.message);
                        }
                    })

            }
        });
    }
    const handleConfirmBlur: React.FocusEventHandler = (e) => {
        const { value } = e.target as HTMLInputElement;
        setConfirmDirty(confirmDirty || !!value)
    };

    const handleCancel = (e: React.MouseEvent) => {
        clearModalType();
        form.resetFields();
        setErrorMsg("");
    }
    const compareToFirstPassword = (rule: any, value: string, callback: (str: string | void) => void) => {
        const { form } = props;
        if (value && value !== form.getFieldValue('newPassword')) {
            callback('两次输入的密码不一致');
        } else {
            callback();
        }
    };

    const validateToNextPassword = (rule: any, value: string, callback: () => void) => {
        const { form } = props;
        if (value && confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    const [move, moveView] = useMove();

    return (
        <div className={S.passwordModalBox} ref={moveView}>
            <div className={S1.modalHeader} ref={move}>
                <div className={S1.modalHeaderTitle}>密码修改</div>
                <div className={S1.modalHeaderClose} onClick={clearModalType}>
                    <Icon type="close" />
                </div>
            </div>
            <div className={S.passwordModalContent}>
                <Form>
                    <Form.Item label="现用密码" {...formItemLayout}>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入您的现用密码',
                                }
                            ],
                            validateTrigger: 'onBlur'
                        })(<Input type="password" placeholder="请输入您的现用密码" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
                    </Form.Item>
                    <Form.Item label="新密码" {...formItemLayout}>
                        {getFieldDecorator('newPassword', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入您的新密码',
                                },
                                {
                                    validator: validateToNextPassword,
                                },
                            ],
                            validateTrigger: 'onBlur'
                        })(<Input type="password" placeholder="请输入您的新密码" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
                    </Form.Item>
                    <Form.Item label="确认密码" {...formItemLayout}>
                        {getFieldDecorator('confirm', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入您的确认密码',
                                },
                                {
                                    validator: compareToFirstPassword
                                },
                            ],
                            validateTrigger: 'onBlur'
                        })(<Input type="password" onBlur={handleConfirmBlur} placeholder="请输入您的确认密码" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
                    </Form.Item>
                    {
                        errorMsg && (
                            <Row>
                                <Col span={8} offset={2}>
                                    <p style={{ color: 'rgb(245, 34, 45)' }}>{errorMsg}</p>
                                </Col>
                            </Row>
                        )
                    }
                    <Form.Item {...submitFormLayout}>
                        {getFieldDecorator(' ', {})(
                            <Fragment>
                                <Button type="primary" style={{ marginRight: '30px' }} onClick={handleSubmit}>保存</Button>
                                <Button onClick={handleCancel}>取消</Button>
                            </Fragment>
                        )}
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

const Password = Form.create<PasswordProps>({ name: 'PasswordModal' })(UpdatePassword);


export default Password;