import {
  loadQuery,
  PreloadedQuery,
  usePreloadedQuery,
  useQueryLoader,
} from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import RelayEnvironment from '../RelayEnvironment';
import type { UserLoginPageQuery as UserLoginQueryType } from './__generated__/UserLoginPageQuery.graphql';
import UserLoginPageQuery from './__generated__/UserLoginPageQuery.graphql';
import { Suspense, useState } from 'react';

const query = graphql`
  query UserLoginPageQuery($id: String!) {
    user(login: $id) {
      name
      createdAt
    }
  }
`;

const initialQueryRef = loadQuery<UserLoginQueryType>(
  RelayEnvironment,
  UserLoginPageQuery,
  {
    id: 'Shubidumdu',
  },
);

type Props = {
  queryRef: PreloadedQuery<UserLoginQueryType>;
};

function UserLoginDisplay({ queryRef }: Props) {
  const { user } = usePreloadedQuery<UserLoginQueryType>(query, queryRef);

  return (
    <div>
      <div>이름: {user?.name}</div>
      <div>생성일: {user?.createdAt}</div>
    </div>
  );
}

function UserLoginPage() {
  const [
    userLoginQueryRef,
    loadUserLoginQuery,
  ] = useQueryLoader<UserLoginQueryType>(UserLoginPageQuery, initialQueryRef);

  const [inputValue, setInputValue] = useState('');
  const onKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    const code = e.code;
    if (code !== 'Enter') return;
    loadUserLoginQuery({ id: inputValue });
  };

  if (!userLoginQueryRef) return null;
  return (
    <Suspense fallback="로딩 중...">
      <UserLoginDisplay queryRef={userLoginQueryRef} />
      <div>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={onKeyPress}
        ></input>
      </div>
      <div>위의 입력창에 github 계정명을 입력하고 Enter를 눌러보세요.</div>
    </Suspense>
  );
}

export default UserLoginPage;
