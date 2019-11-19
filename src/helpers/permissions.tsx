import { Alert } from 'react-native';
import * as Permissions from 'expo-permissions';

export const verifyPermissions = async (...permissionsRequested: Permissions.PermissionType[]): Promise<boolean> => {
  let gotPermissions: boolean = true;
  const result = await Permissions.askAsync(
    ...permissionsRequested
  );

  if (result.status !== 'granted') {
    Alert.alert(
      'Insufficient permissions',
      'You need to grant permissions to use this app',
      [{ text: 'Okay' }]
    );
    gotPermissions = false;
  }

  return gotPermissions;
};