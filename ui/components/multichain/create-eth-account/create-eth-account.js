import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { KeyringTypes } from '@metamask/keyring-controller';
import {
  addNewAccount,
  setAccountLabel,
  getNextAvailableAccountName as getNextAvailableAccountNameFromController,
} from '../../../store/actions';
import { CreateAccount } from '../create-account';

export const CreateEthAccount = ({
  onActionComplete,
  onSelectSrp,
  selectedKeyringId,
}) => {
  const dispatch = useDispatch();

  const onCreateAccount = async (name) => {
    const newAccountAddress = await dispatch(addNewAccount(selectedKeyringId));
    if (name) {
      dispatch(setAccountLabel(newAccountAddress, name));
    }
    onActionComplete(true);
  };

  const getNextAvailableAccountName = async () => {
    return await getNextAvailableAccountNameFromController(KeyringTypes.hd);
  };

  return (
    <CreateAccount
      onActionComplete={onActionComplete}
      onCreateAccount={onCreateAccount}
      getNextAvailableAccountName={getNextAvailableAccountName}
      onSelectSrp={onSelectSrp}
      selectedKeyringId={selectedKeyringId}
    ></CreateAccount>
  );
};

CreateEthAccount.propTypes = {
  /**
   * Executes when the Create button is clicked
   */
  onActionComplete: PropTypes.func.isRequired,
  /**
   * Callback to select the SRP
   */
  onSelectSrp: PropTypes.func,
  /**
   * Currently selected HD keyring
   */
  selectedKeyringId: PropTypes.string,
};
