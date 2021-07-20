import React, { useState, useEffect, useCallback } from 'react'
import { debounce } from 'lodash'
import userStory from '../services/user_story'

const Search = (props) => {
  const { title } = props

  const [searchResults, setSearchResults] = useState([])

  const strip = (html) => {
    return html.replace(/<\s*[^>]*>/gi, '')
  }

  const handleTitleChange = useCallback(
    debounce(async (title) => {
      const response = await userStory.getStoriesByTitle(title)
      setSearchResults(response.data.data.userStories)
    }, 600),
    []
  )

  useEffect(() => {
    handleTitleChange(title)
  }, [title, handleTitleChange])

  if (!title) {
    return ''
  }
  return (
    <div className='flex flex-column title-search'>
      <h4>
        <i className='eos-icons'>arrow_forward</i>
        {searchResults.length > 0
          ? ' We found some matching results'
          : ' No matching stories found. Go ahead and create one.'}
      </h4>
      {searchResults.map((result, key) => {
        return (
          <div
            className='story title-search-results'
            onClick={() => window.open(`/story/${result.id}`, '_blank')}
            key={key}
          >
            <div className='stories-content title-search-result'>
              <h4>{result.Title}</h4>
              {strip(result.Description)}
            </div>
            <div className='icon-display'>
              {result.followers.length}
              <i className='eos-icons'>thumb_up</i>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Search