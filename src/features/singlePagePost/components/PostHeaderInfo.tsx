import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { Author } from '@/types/Author';
import { Topic } from '@/types/Topic';

import * as S from './PostHeaderInfo.styled';
import PostDate from '@/components/general/TimeAgo';
import {
  deleteFollowUser,
  postFollowUser,
  selectFollowActionState,
  selectProfileFollowedUsers,
} from '@/features/profile/profileSlice';
import { ButtonInteraction } from '@/styles/animations/ButtonInteraction';

type PostAuthorProps = {
  isAuthor: boolean;
  author: Author;
  date: string;
  topic: Topic;
  bodyLength: number;
};

const PostHeaderInfo = ({
  isAuthor,
  author,
  date,
  topic,
  bodyLength,
}: PostAuthorProps) => {
  const followActionState = useAppSelector(selectFollowActionState);
  const followList = useAppSelector(selectProfileFollowedUsers);

  const dispatch = useAppDispatch();

  const handleFollowAdd = (): void => {
    if (!followActionState.isLoading) dispatch(postFollowUser(author._id));
  };

  const handleFollowRemove = (): void => {
    if (!followActionState.isLoading) dispatch(deleteFollowUser(author._id));
  };

  const isFollowed = followList?.some((f) => f === author._id);

  const handleFollowClick = isFollowed ? handleFollowRemove : handleFollowAdd;
  const followButtonText = isFollowed ? 'Followed' : 'Follow';

  return (
    <S.Wrapper>
      <S.ProfileIcon imageId={author.profile_image} altText="Author Icon" />
      <S.MainContainer>
        <S.StyledLink to={`/authors/${author._id}`}>
          <S.Name>{author.username}</S.Name>
        </S.StyledLink>
        {!isAuthor && (
          <>
            <S.Divider>·</S.Divider>
            <S.FollowButton
              whileTap={ButtonInteraction.whileTap.animation}
              onClick={handleFollowClick}
              type="button"
              value={followButtonText}
            />
          </>
        )}
      </S.MainContainer>
      <S.MiscContainer>
        <S.TopicInfo>
          Published in
          <S.StyledLink to="/">
            <S.TopicName> {topic.name}</S.TopicName>
          </S.StyledLink>
        </S.TopicInfo>
        <S.Divider>·</S.Divider>
        <S.PostReadEstimate bodyLength={bodyLength} />
        <S.Divider>·</S.Divider>
        <PostDate date={date} />
      </S.MiscContainer>
    </S.Wrapper>
  );
};

export default PostHeaderInfo;
