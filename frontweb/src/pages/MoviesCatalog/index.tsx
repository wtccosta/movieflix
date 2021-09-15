import { AxiosRequestConfig } from 'axios';
import MovieCard from 'components/MovieCard';
import Pagination from 'components/Pagination';
import SearchComponent, { ProductFilterData } from 'components/SearchComponent';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from 'types/movie';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';

import './styles.css';

type ControlComponentsData = {
  activePage: number;
  filterData: ProductFilterData;
};

const MoviesCatalog = () => {
  const [page, setPage] = useState<SpringPage<Movie>>();

  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
      filterData: { genre: null },
    });

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({
      activePage: pageNumber,
      filterData: controlComponentsData.filterData,
    });
  };

  const handleSubmitFilter = (data: ProductFilterData) => {
    setControlComponentsData({ activePage: 0, filterData: data });
  };

  const getMovies = useCallback(() => {
    const params: AxiosRequestConfig = {
      url: '/movies',
      withCredentials: true,
      params: {
        page: controlComponentsData.activePage,
        size: 4,
        genreId: controlComponentsData.filterData.genre?.id,
      },
    };

    requestBackend(params).then((response) => {
      setPage(response.data);
    });
  }, [controlComponentsData]);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  return (
    <div className="container catalog-custom-content">
      <div className="row">
        <div className="col-12">
          <div
            className="base-card movies-catalog-search my-3
           d-flex flex-grow-1 align-items-center justify-content-center justify-content-md-start"
          >
            <SearchComponent onSubmitFilter={handleSubmitFilter} />
          </div>
        </div>
      </div>
      <div className="row">
        {page?.content.map((item) => (
          <div className="links-area col-md-6 col-lg-3" key={item.id}>
            <Link to={`movies/${item.id}`}>
              <MovieCard movie={item} />
            </Link>
          </div>
        ))}
      </div>
      <div className="row">
        <div className="col-12">
          <Pagination
            forcePage={page?.number}
            pageCount={page ? page.totalPages : 0}
            range={3}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default MoviesCatalog;
