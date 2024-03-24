import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { selectProfileImageId } from '@/features/profile/profileSlice';
import { clearTopic } from '@/features/postList/postListSlice';
import { logout, selectIsAuthenticated } from '@/features/auth/authSlice';
import { openLoginModal } from '@/features/auth/authSlice';

import { ButtonInteraction } from '@/styles/animations/ButtonInteraction';

import LoginDialog from '@/features/auth/components/LoginDialog';
import * as S from './Header.styled';
import { exitEditMode } from '@/features/postForm/postFormSlice';

const Header = () => {
  const { pathname } = useLocation();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const profileImageId = useAppSelector(selectProfileImageId);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogoClick = (): void => {
    dispatch(clearTopic());
    navigate('/');
  };

  const handleLoginClick = (): void => {
    dispatch(openLoginModal());
  };

  const handleLogoutClick = (): void => {
    dispatch(logout());
    location.reload();
  };

  const handleWritePostClick = (): void => {
    dispatch(exitEditMode());
    navigate('/post-form');
  };

  return (
    <S.Wrapper>
      <S.Logo whileHover={{ x: -1, y: -1 }} onClick={handleLogoClick} src="/logo.svg" />
      <S.ProfileWrapper>
        {isAuthenticated ? (
          <>
            { pathname !== '/post-form' &&
              <S.NewPostButton onClick={handleWritePostClick}>
                <S.StyledAppIcon src="/post.svg" alt="Create New Post Icon" />
                <S.NewPostButtonText>Write</S.NewPostButtonText>
              </S.NewPostButton>
            }
            <S.StyledLink to="/profile">
              <S.ProfileIcon
                imageId={profileImageId}
                placeholderSrc="/empty.png"
                altText="Current User Profile Picture"
              />
            </S.StyledLink>
            <S.HeaderButton
              whileTap={ButtonInteraction.whileTap.animation}
              onClick={handleLogoutClick}
              type="button"
              value="Logout"
            />
          </>
        ) : (
          <S.HeaderButton
            whileTap={ButtonInteraction.whileTap.animation}
            onClick={handleLoginClick}
            type="button"
            value="Login"
          />
        )}
      </S.ProfileWrapper>
      <LoginDialog />
    </S.Wrapper>
  );
};

export default Header;
