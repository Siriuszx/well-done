import styled from 'styled-components';
import PostReadTime from '@/components/general/PostReadTime';
import { NavLink } from 'react-router-dom';

export const Wrapper = styled.div`
  align-self: flex-start;
  display: grid;
  grid-template-columns: auto auto;
  grid-template-areas:
    'icon main'
    'icon misc';
  column-gap: 1rem;
`;

export const PostLink = styled(NavLink)`
  color: inherit;
  text-decoration: none;
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  font-size: 0.9rem;
  font-weight: 300;
`;

export const MainContainer = styled(InfoContainer)`
  grid-area: main;
`;

export const MiscContainer = styled(InfoContainer)`
  grid-area: misc;
`;

export const Divider = styled.span`
  font-size: 0.9rem;
`;

export const ProfileIcon = styled.img`
  grid-area: icon;

  width: 48px;
  border-radius: 50%;
`;

export const Name = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
`;

export const TopicInfo = styled.span``;

export const TopicName = styled.strong``;

export const PostReadEstimate = styled(PostReadTime)``;

export const FollowButton = styled.input`
  border: 1px solid transparent;
  background-color: transparent;

  color: ${({ theme }) => theme.color.text_clr_button_follow};
  font-size: 1rem;

  cursor: pointer;
`;