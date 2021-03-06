import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import { globalStyles } from '../../styles.js'
const { darkBlue, white } = globalStyles

const LoadComments = ({
  kids,
  loadSubComments,
  id,
  commentChain,
  commentThatsLoading
}) => {
  const imLoading = commentThatsLoading === id
  return (
    <TouchableHighlight
      underlayColor='#e7e6e6'
      activeOpacity={.8}
      style={styles.viewComments}
      onPress={() => loadSubComments(id, commentChain, kids)}
    >
      <Text style={styles.viewCommentsText}>
        {
          imLoading
          ? 'Loading...'
          : `${kids.length} repl${kids.length > 1 ? 'ies' : 'y'}`
        }
      </Text>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  viewComments: {
    marginTop: 5,
    marginBottom: 5,
    paddingRight: 5,
    paddingLeft: 5,
    borderRadius: 10,
    backgroundColor: white
  },
  viewCommentsText: {
    color: darkBlue,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    textAlign: 'center'
  },
})

export default LoadComments
