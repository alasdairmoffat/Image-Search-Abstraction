import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, FormGroup, Input, InputGroup } from 'reactstrap';
import { useAddSearchHistoryMutation } from '../api/apiSlice';
import { updateSearchTerm } from './imagesSlice';

const SearchForm = () => {
  const dispatch = useDispatch();
  const [addHistory] = useAddSearchHistoryMutation();

  const [inputText, setInputText] = useState('');

  const onChange = (e: ChangeEvent) => {
    const currentTarget = e.target as HTMLInputElement;

    setInputText(currentTarget.value);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    addHistory({ searchTerm: inputText });
    dispatch(updateSearchTerm(inputText));
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
          <Button>Search</Button>
        </InputGroup>
      </FormGroup>
    </Form>
  );
};

export default SearchForm;
