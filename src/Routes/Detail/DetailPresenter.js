import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Message from "Components/Message";
import ReactPlayer from "react-player";
import CircularIndeterminate from "Components/Loader";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 20px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
`;

const ViewContainer = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: auto;
  &::-webkit-scrollbar {
    height: 7px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #b33939;
    border-radius: 10px;
    background-clip: padding-box;
    border: 1px solid transparent;
  }
  &::-webkit-scrollbar-track {
    background-color: #4b4b4b;
    border-radius: 10px;
  }
  }
`;

const Item = styled.span``;

const Vote = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const Slink = styled.a``;

const Logoimage = styled.img`
  width: 30px;
  border: 1px solid white;
`;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const Poster = styled.div`
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 10px;
  border: 1px solid black;
  margin: 5px;
  height: 200px;
  width: 150px;
`;

const Season = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  align-items: center;
`;

const Player = styled(ReactPlayer)`
  margin: 20px;
`;

const Section = styled.p`
  margin-top: 30px;
  font-weight: bold;
  font-size: 20px;
`;

const Word = styled.span`
  opacity: 0.7;
  line-height: 1.5;
  margin-top: 5px;
`;

const Hr = styled.hr`
  margin: 10px 0px;
`;

const DetailPresenter = ({ result, loading, error }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Nepflix</title>
      </Helmet>
      <CircularIndeterminate />
    </>
  ) : error ? (
    <Message />
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Nepflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png").default
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Vote>
              {result.vote_average
                ? `⭐️ ${result.vote_average} / 10`
                : `⭐️ 0 / 0`}
            </Vote>
          </ItemContainer>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]} min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.production_companies
                ? result.production_companies.map((company, index) =>
                    index === result.production_companies.length - 1
                      ? `${company.name}`
                      : `${company.name} / `
                  )
                : ""}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.production_countries
                ? result.production_countries.map((country, index) =>
                    index === result.production_countries.length - 1
                      ? `${country.name}`
                      : `${country.name} / `
                  )
                : ""}
            </Item>
            <Divider>•</Divider>
            <Slink
              href={`https://www.imdb.com/title/${result.imdb_id}`}
              target={"_blank"}
            >
              <Logoimage
                src={
                  "https://m.media-amazon.com/images/G/01/IMDb/BG_rectangle._CB1509060989_SY230_SX307_AL_.png"
                }
              />
            </Slink>
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          {result.credits.cast[0] ? <Section>•Cast</Section> : null}
          {result.credits.cast[0] ? <Hr /> : null}
          <ViewContainer>
            {result.credits.cast
              ? result.credits.cast.map((c) => (
                  <Season key={c.id}>
                    <Poster
                      bgImage={`https://image.tmdb.org/t/p/w300${c.profile_path}`}
                    />
                    <Item>{c.name}</Item>
                    <Word>{c.character}</Word>
                  </Season>
                ))
              : null}
          </ViewContainer>
          {result.seasons ? <Section>•Season</Section> : null}
          {result.seasons ? <Hr /> : null}
          <ViewContainer>
            {result.seasons
              ? result.seasons.map((season) => (
                  <Season key={season.id}>
                    <Poster
                      bgImage={`https://image.tmdb.org/t/p/w300${season.poster_path}`}
                    />
                    <Item>{season.name}</Item>
                    <Word>{season.air_date}</Word>
                  </Season>
                ))
              : null}
          </ViewContainer>
          {result.videos.results[0] ? <Section>•Video</Section> : null}
          {result.videos.results[0] ? <Hr /> : null}
          <ViewContainer>
            {result.videos.results.map((video) => (
              <div>
                <Player
                  url={`https://www.youtube.com/embed/${video.key}`}
                  controls
                  width={"320px"}
                  height={"240px"}
                />
              </div>
            ))}
          </ViewContainer>
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
