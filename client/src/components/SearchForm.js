import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
} from 'reactstrap';

import {
  updateInputText,
  updateSearchTerm,
  fetchImages,
} from '../store/actions/imagesActions';

const SearchForm = () => {
  const inputText = useSelector((state) => state.images.inputText);

  const dispatch = useDispatch();

  const onChange = (e) => {
    dispatch(updateInputText(e.target.value));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const searchTerm = inputText;

    dispatch(updateSearchTerm(searchTerm));
    dispatch(fetchImages(searchTerm));
  };

  return (
    <Form onSubmit={onSubmit} style={{ width: '80%' }}>
      <FormGroup>
        <InputGroup>
          <Input
            type="search"
            name="search"
            id="search"
            placeholder="Image Search"
            onChange={onChange}
            value={inputText}
          />
          <InputGroupAddon addonType="append">
            <Button>Search</Button>
          </InputGroupAddon>
        </InputGroup>
      </FormGroup>
    </Form>
  );
};

export default SearchForm;
