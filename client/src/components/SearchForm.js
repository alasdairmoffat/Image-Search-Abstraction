import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
} from 'reactstrap';

const SearchForm = ({ inputText, onSubmit, onChange }) => (
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

SearchForm.propTypes = {
  inputText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchForm;
