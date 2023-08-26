import { Component } from 'react';

import {
  Button,
  SearchForm,
  Grid,
  GridItem,
  Text,
  CardItem,
  Loader,
  Modal,
} from 'components';
import { getImages } from 'service/image-service';

export class Gallery extends Component {
  state = {
    page: 1,
    query: '',
    images: [],
    isEmpty: false,
    isLoadMore: false,
    isError: null,
    isLoading: false,
    url: '',
    alt: '',
  };

  componentDidUpdate(_, prevState) {
    const { page, query } = this.state;
    if (prevState.page !== page || prevState.query !== query) {
      this.setState({ isLoading: true });
      getImages(query, page)
        .then(({ photos, total_results }) => {
          if (!photos.length) {
            this.setState({ isEmpty: true });
            return;
          }
          this.setState(prevState => ({
            images: [...prevState.images, ...photos],
            isLoadMore: page < Math.ceil(total_results / 15),
          }));
        })
        .catch(error => this.setState({ isError: error.message }))
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  openModal = ({ url, alt }) => {
    this.setState({ url, alt });
  };

  handleQuery = query => {
    this.setState({ query, page: 1, images: [], isEmpty: false });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  render() {
    const { images, isEmpty, isLoadMore, isError, isLoading, url, alt } =
      this.state;
    return (
      <>
        <SearchForm onSubmit={this.handleQuery} />
        <Grid>
          {images.map(image => (
            <GridItem key={image.id}>
              <CardItem color={image.avg_color}>
                <img
                  src={image.src.large}
                  alt={image.alt}
                  onClick={() =>
                    this.openModal({ url: image.src.large, alt: image.alt })
                  }
                />
              </CardItem>
            </GridItem>
          ))}
        </Grid>
        {isEmpty && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
        {isLoadMore && <Button onClick={this.handleLoadMore}>Load more</Button>}
        {isError && <Text textAlign="center">Sorry.{isError} 😭</Text>}
        {isLoading && <Loader />}
        {url && <Modal url={url} alt={alt} closeModal={this.openModal} />}
      </>
    );
  }
}
