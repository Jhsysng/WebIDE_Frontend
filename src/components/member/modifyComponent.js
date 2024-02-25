import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Avatar, Button, Flex, Input, Popover } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { deleteMember, modifyMember } from "../../api/memberApi";
import { CustomModal } from "./CustomModal";
import { login } from "../../redux/reducers/loginSlice";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 96px - 48px);
`;

const Card = styled.div`
  background-color: #ffffff;
  width: 20rem;
`;

const InputWrapper = styled.div`
  margin-top: 10px;
  display: flex:
  flex-direction: row;
`;

const initState = {
  email: "",
  pwd: "",
  nickname: "",
};

export const ModifyComponent = () => {
  const [member, setMember] = useState(initState);
  const [loadings, setLoadings] = useState([]);
  const [modal2Open, setModal2Open] = useState(false);

  const loginInfo = useSelector((state) => state.loginSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    setMember({ ...loginInfo });
  }, [loginInfo]);

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 2000);
  };

  const handleChange = (e) => {
    member[e.target.name] = e.target.value;
    setMember({ ...member });
  };

  const handleClickModify = () => {
    modifyMember(member).then((res) => {
      dispatch(login(res));
    });
  };

  const handleClickDelete = () => {
    deleteMember(member);
  };

  return (
    <Container>
      <Card>
        <Flex gap="small" align="center" wrap="wrap" vertical="true">
          <Avatar size={64} src={member.profile}>
            {member.nickname[0]}
          </Avatar>
          <div></div>
          <InputWrapper>
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              name="email"
              value={member.email}
              variant="filled"
              disabled
              onChange={handleChange}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              name="nickname"
              value={member.nickname}
              variant="filled"
              onChange={handleChange}
            />
          </InputWrapper>
          <div></div>
          <InputWrapper>
            <Button
              className="m-3 bg-[#1880ff] font-semibold"
              type="primary"
              loading={loadings[0]}
              onClick={() => {
                enterLoading(0);
                handleClickModify();
              }}
            >
              수정하기
            </Button>
            <Popover placement="bottom" content={"정말로 탈퇴하실건가요? 🥹"}>
              <Button
                className="m-3 font-semibold"
                danger
                type="primary"
                onClick={() => {
                  setModal2Open(true);
                  // handleClickDelete();
                }}
              >
                탈퇴하기
              </Button>
              <CustomModal
                setModal2Open={setModal2Open}
                modal2Open={modal2Open}
                handle={handleClickDelete}
              />
            </Popover>
          </InputWrapper>
        </Flex>
      </Card>
    </Container>
  );
};
