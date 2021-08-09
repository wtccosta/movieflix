import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from 'types/movie';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';

import './styles.css'
 
const MoviesCatalog = () => {
  const [page, setPage] = useState<SpringPage<Movie>>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: '/movies',
      withCredentials: true,
      params: {
        page: 0,
        size: 12,
      },
    };

    requestBackend(params).then((response) => {
      setPage(response.data);
    });
  }, []);

  return (
    <div className="container custom-content">
      <h1>Tela listagem de filme</h1>
      {page?.content.map((item, key) => (
        <div className="links-area" key={item.id}>
          <Link to={`movies/${item.id}`}>Acessar /movies/{item.id}</Link>
          <br /> <br />
    
        </div>
      ))}
    </div>
  );
};
 
export default MoviesCatalog;
