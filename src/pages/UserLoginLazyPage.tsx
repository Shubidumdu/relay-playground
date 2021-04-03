import { useLazyLoadQuery } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import type { UserLoginLazyPageQuery as UserLoginQueryType } from './__generated__/UserLoginLazyPageQuery.graphql';
import { Suspense } from 'react';

const query = graphql`
  query UserLoginLazyPageQuery($id: String!) {
    user(login: $id) {
      name
      createdAt
      avatarUrl
      company
    }
  }
`;

const UserInfo = () => {
  const { user } = useLazyLoadQuery<UserLoginQueryType>(query, {
    id: 'shubidumdu',
  });

  return (
    <div>
      <img alt="avatarImg" src={user ? (user.avatarUrl as string) : ''} />
      <div>이름: {user?.name}</div>
      <div>생성일: {user?.createdAt}</div>
      <div>회사: {user?.company}</div>
    </div>
  );
};

function UserLoginLazyPage() {
  return (
    <Suspense fallback="로딩 중...">
      <UserInfo />
    </Suspense>
  );
}

export default UserLoginLazyPage;
