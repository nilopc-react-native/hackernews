import { createAction } from 'redux-actions'
import {
  LOAD_COMMENTS_REQUEST,
  LOAD_COMMENTS_SUCCESS,
  LOAD_COMMENTS_ERROR,
  LOAD_SUB_COMMENTS_REQUEST,
  LOAD_SUB_COMMENTS_SUCCESS,
  LOAD_SUB_COMMENTS_ERROR,
  ROOT_URL
} from '../constants'

const onLoadCommentsRequest = createAction(LOAD_COMMENTS_REQUEST)
const onLoadCommentsSuccess = createAction(LOAD_COMMENTS_SUCCESS)
const onLoadCommentsError = createAction(LOAD_COMMENTS_ERROR)

const onLoadSubCommentsRequest = createAction(LOAD_SUB_COMMENTS_REQUEST)
const onLoadSubCommentsSuccess = createAction(LOAD_SUB_COMMENTS_SUCCESS)
const onLoadSubCommentsError = createAction(LOAD_SUB_COMMENTS_ERROR)

const fetchComment = (id) => fetch(`${ROOT_URL}/item/${id}.json`)

const getComments = (ids) => {
  return Promise.all(ids.map(fetchComment))
    .then((responses) => (
      Promise.all(responses.map(res => res.json()))
    ))
}

const getSubComments = (ids) => {
  return Promise.all(ids.map(fetchComment))
    .then((responses) => (
      Promise.all(responses.map(res => res.json()))
    ))
    .then((comments) => {
      const stillNeedToFetch = []
      comments.forEach((comment) => {

        if (comment.kids) {
          stillNeedToFetch.push(comment.kids)
        }
      })

      if (stillNeedToFetch.length) {

      }

      return comments
    })
}

export function loadComments (commentIds) {
  return (dispatch) => {
    dispatch(onLoadCommentsRequest())

    getComments(commentIds)
      .then((comments) => dispatch(onLoadCommentsSuccess(comments)))
      .catch((err) => dispatch(onLoadCommentsError(err)))
  }
}

export function loadSubComments (parentId, commentIds) {


  return (dispatch) => {
    dispatch(onLoadSubCommentsRequest(parentId))

    getSubComments(commentIds)
      .then((comments) => dispatch(onLoadSubCommentsSuccess(comments)))
      .catch((err) => dispatch(onLoadSubCommentsError(err)))
  }
}
