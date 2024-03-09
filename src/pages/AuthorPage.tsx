import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  fetchAuthor,
  selectAuthorData,
  selectFetchAuthorState,
} from '@/features/authorPage/authorPageSlice';

import BookmarkContainer from '@/features/profile/components/BookmarkContainer';
import Spinner from '@/components/loaders/Spinner';
import Error from '@/components/general/Error';
import {
  BookmarkWrapper,
  ProfileIcon,
  ProfileWrapper,
  StyledAsideUserName,
  StyledMainUserName,
  Wrapper,
  WrapperAside,
  WrapperMain,
} from './AuthorPage.styled';

const AuthorPage = () => {
  const { authorid } = useParams();

  const authorData = useAppSelector(selectAuthorData);
  const { isLoading, error } = useAppSelector(selectFetchAuthorState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAuthor(authorid!));
  }, [authorid, dispatch]);

  return (
    <Wrapper>
      <WrapperMain>
        <StyledMainUserName>{authorData?.username}</StyledMainUserName>
        <BookmarkWrapper>
          <BookmarkContainer />
        </BookmarkWrapper>
      </WrapperMain>
      <WrapperAside>
        <ProfileWrapper>
          {isLoading ? (
            <Spinner />
          ) : error ? (
            <Error />
          ) : (
            <>
              <ProfileIcon src="/portrait-placeholder.png" alt="Profile Icon" />
              <StyledAsideUserName>{authorData?.username}</StyledAsideUserName>
            </>
          )}
        </ProfileWrapper>
      </WrapperAside>
    </Wrapper>
  );
};

export default AuthorPage;
