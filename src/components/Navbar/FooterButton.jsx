import React from 'react'
import { AddButton } from './Nav.styled'
import { useState } from 'react';

function FooterButton({setShowModal}) {

  return (
    <AddButton onClick={() => setShowModal(true)} data-testid="add-button">
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
 </AddButton>
  )
}

export default FooterButton