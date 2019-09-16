# Image Search Abstraction

> FreeCodeCamp Image Search Abstraction challenge.

[![License](https://img.shields.io/:license-mit-blue.svg?style=flat-square)](https://badges.mit-license.org)
[![Build Status](https://travis-ci.com/alasdairmoffat/Image-Search-Abstraction.svg?branch=master)](https://travis-ci.com/alasdairmoffat/Image-Search-Abstraction)
[![codecov](https://codecov.io/gh/alasdairmoffat/Image-Search-Abstraction/branch/master/graph/badge.svg)](https://codecov.io/gh/alasdairmoffat/Image-Search-Abstraction)

## Table of Contents

- [Preview](#preview)
- [General Info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)
- [License](#license)

## Preview

[Heroku](https://mern-image-search-abstraction.herokuapp.com)

## General Info

Project built to fulfill the following User Stories:

1. I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
2. I can paginate through the responses by adding an `?offset=2` parameter to the URL.
3. I can get a list of the most recently submitted search strings.

### Example usage

**GET** `/api/imagesearch/:searchterm`  
returns up to 10 image search results

**GET** `/api/latest/imagesearch`  
returns 5 most recent searches

**POST** `/api/latest/imagesearch`  
**body** (urlencoded)): `searchterm=searchterm`  
adds `searchterm` to database

### Example returns

**GET** `/api/imagesearch/test`

```json
{
    "totalResults": "12400000",
    "page": 1,
    "items": [
        {
            "title": "Contrast Paint Test - Album on Imgur",
            "htmlTitle": "Contrast Paint <b>Test</b> - Album on Imgur",
            "link": "https://imgur.com/gallery/cge87zj",
            "snippet": "Jun 8, 2019 ... Post with 2590 votes and 105617 views. Shared by Ymir. Contrast Paint Test.",
            "htmlSnippet": "Jun 8, 2019 <b>...</b> Post with 2590 votes and 105617 views. Shared by Ymir. Contrast Paint <b>Test</b>.",
            "src": "https://i.imgur.com/ccBTK1x.jpg?fb"
        },
        ...
    ]
}
```

**GET** `/api/latest/imagesearch`

```json
[
  {
    "searchTerm": "test",
    "date": "2019-09-02T14:22:05.737Z"
  },
  ...
]
```

## Technologies

- Node.js version: 10.15
- Express version: 4.17
- Chai version: 4.2
- Mocha version: 6.2
- Helmet version: 3.20
- Mongoose version: 5.6
- React version: 16.9
- Redux: version 4.0
- Bootstrap version: 4.3

## Setup

### Clone

Clone from repository

```bash
git clone https://github.com/alasdairmoffat/Image-Search-Abstraction.git
```

### Installation

```bash
cd Image-Search-Abstraction
npm install
cd ./client/
npm install
cd ..

# Run client and server
npm run dev

# Run server only
npm start

# Run client only
npm run client

# Run tests
npm test
```

## License

> **[MIT license](https://opensource.org/licenses/mit-license.php)**
