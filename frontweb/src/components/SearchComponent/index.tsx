import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Genre } from 'types/genre';
import { requestBackend } from 'util/requests';
import './styles.css';

export type ProductFilterData = {
  genre: Genre | null;
};

type Props = {
  onSubmitFilter: (data: ProductFilterData) => void;
};

const SearchComponent = ({ onSubmitFilter }: Props ) => {
  const [selectGenres, setSelectGenres] = useState<Genre[]>([]);

  const { handleSubmit, setValue, getValues, control } =
    useForm<ProductFilterData>();

  const onSubmit = (formData: ProductFilterData) => {
    onSubmitFilter(formData);
  };

  const handleChangeCategory = (value: Genre) => {
    setValue('genre', value);

    const obj: ProductFilterData = {
      genre: getValues('genre'),
    };

    onSubmitFilter(obj);
  };

  useEffect(() => {

      const params: AxiosRequestConfig = {
        url: '/genres',
        withCredentials: true,
      };

      requestBackend(params).then((response) => {
        setSelectGenres(response.data);
      });

    
  }, []);

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="product-filter-form">
          <div className="product-filter-category-container">
            <Controller
              name="genre"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={selectGenres}
                  isClearable
                  placeholder="Gêneros"
                  classNamePrefix="product-filter-select"
                  onChange={(value) => handleChangeCategory(value as Genre)}
                  getOptionLabel={(genre: Genre) => genre.name}
                  getOptionValue={(genre: Genre) => String(genre.id)}
                />
              )}
            />
          </div>
         
      </form>
  );
};

export default SearchComponent;