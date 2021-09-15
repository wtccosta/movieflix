import { AxiosRequestConfig } from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { requestBackend } from 'util/requests';
import ProductInfoLoader from './ProductInfoLoader';
import ProductDetailsLoader from './ProductDetailsLoader';
import { Review } from 'types/review';
import { hasAnyRoles } from 'util/auth';

import { ReactComponent as StarImage } from 'assets/images/star.svg';

import './styles.css';

type UrlParams = {
  movieId: string;
};

type FormData = {
  review: string;
};

const ProductDetails = () => {
  const { movieId } = useParams<UrlParams>();

  const [formData, setFormData] = useState<FormData>({
    review: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Review[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);

  const loadData = useCallback(() => {
    const params: AxiosRequestConfig = {
      url: `/movies/${movieId}/reviews`,
      withCredentials: true,
    };

    requestBackend(params)
      .then((response) => {
        setProducts(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setProducts, movieId])

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasError(false);
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.review === '') {
      setHasError(true);
      return;
    }
    const params: AxiosRequestConfig = {
      url: `/reviews`,
      withCredentials: true,
      method: 'POST',
      data: {
        text: formData.review,
        movieId,
      },
    };

    requestBackend(params)
      .then((response) => {
        formData.review = '';
        loadData();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="product-details-container">
      <h3>Tela detalhes do filme id: {movieId}</h3>
      <div className="row">
        <div className="col">
          {isLoading ? (
            <ProductInfoLoader />
          ) : (
            <>
              {hasAnyRoles(['ROLE_MEMBER']) && (
                <div className="base-card product-details-card">
                  <>
                    <form onSubmit={handleSubmit}>
                      <div className="d-grid gap-2">
                        <input
                          type="text"
                          name="review"
                          value={formData.review}
                          onChange={handleChange}
                          className={`form-control custom-form ${
                            hasError ? 'is-invalid' : ''
                          }`}
                        />
                        {hasError && (
                          <p className="invalid-feedback">
                            Não pode estar em branco.
                          </p>
                        )}
                        <button
                          type="submit"
                          className="btn btn-primary my-2 text-uppercase fw-bold"
                        >
                          salvar avaliação
                        </button>
                      </div>
                    </form>
                  </>
                </div>
              )}
            </>
          )}

          {isLoading ? (
            <ProductDetailsLoader />
          ) : (
            <div className="base-card product-details-card">
              {products?.map((item, key) => (
                <div className="review-content" key={item.id}>
                  <div className="rv-title">
                    <div>
                      <StarImage />
                    </div>
                    <div>
                      <h3>{item.user.name}</h3>
                    </div>
                  </div>

                  <p className="rv-content">{item.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
