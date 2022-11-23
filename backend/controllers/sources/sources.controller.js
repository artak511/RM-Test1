const express = require('express');
const { validationResult, matchedData } = require('express-validator');

const SourceStore = require('./sources.store');
const router = express.Router();

const listSourcesDto = require('./dto/list-sources.dto');
const getSourcesDto = require('./dto/get-source.dto');
const createSourceDto = require('./dto/create-source.dto');
const updateSourceDto = require('./dto/update-source.dto');
const deleteSourceDto = require('./dto/delete-source.dto');

/*
  * Retrieves all list of sources
*/
const listSources = [listSourcesDto, function(req, res, next) {
  const { page = 1, perPage = 2, search } = matchedData(req, { locations: ['query'] });
  console.log(page, perPage, "✅ => page, perPage");

  let data = SourceStore;

  if (search) {
    console.log(search, "✅ => search");
    const _search = search?.toLowerCase()?.trim();
    data = data.filter((element => {
     return  element.name.toLowerCase().includes(_search) ||
      element.ipAddress.toLowerCase().includes(_search) ||
      element.tags.some(tag => _search.indexOf(tag.toLowerCase()) >= 0)
    }))
  }

  return res.send(
    {
      data: data.slice((page-1)*perPage, page*perPage),
      page: +page,
      perPage: +perPage,
      count: data.length
    });
}];

/*
  * Get one source
*/
const getSource = [getSourcesDto, function(req, res, next) {
  const { id } = matchedData(req, { locations: ['params'] });

  return res.send(SourceStore.find(element => element.id === +id));
}];

/* 
  * Creates new source
*/
const createSource = [createSourceDto, function(req, res, next) {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const payload = {
    ...matchedData(req),
    createdAt: Date.now()
  };
  
  const source = SourceStore.create(payload);

  return res.send(source);
}];


/* 
  * Update existing source
*/
const updateSource = [updateSourceDto, function(req, res, next) {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = matchedData(req, { locations: ['params'] });
  console.log(req.body, "✅ => req.body");
  const payload = {
    ...matchedData(req, { locations: ['body'] }),
    updatedAt: Date.now()
  };
  
  console.log(payload, "✅ => payload");

  const updatedSource = SourceStore.update(id, payload);

  if (!updatedSource) {
    return res.status(404).json({ message: 'Source was not found' });
  }

  return res.send(updatedSource);
}];


/* 
  * Deletes existing source
*/
const deleteSource = [deleteSourceDto, function(req, res, next) {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = matchedData(req, { locations: ['params'] });

  const deletedSource = SourceStore.delete(id);

  if (!deletedSource) {
    return res.status(404).json({ message: 'Source was not found' });
  }

  return res.send(true)
}];

/*
  * Get Tags
*/
const getTags = [function(req, res, next) {
  const tags = []
  SourceStore.forEach((el) => {
    el?.tags?.forEach(tag => {
      if (tags.indexOf(tag) == -1) {
        tags.push(tag)
      }
    })
  }, []);
  return res.send(tags)
}];

module.exports = router
  .get('/', ...listSources)
  .get('/tags', ...getTags)
  .get('/:id', ...getSource)
  .post('/', ...createSource)
  .patch('/:id', ...updateSource)
  .delete('/:id', ...deleteSource)

