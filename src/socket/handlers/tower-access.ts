import { AcolyteDataToAccessOrExitTower } from '../../interfaces/socket';
import { SetUser } from '../../interfaces/player';

function handleAcolyteTowerAccess(
  acolyteData: AcolyteDataToAccessOrExitTower,
  setUser: SetUser,
) {
  setUser(prevUser => ({
    ...prevUser!,
    is_in_tower_entrance: acolyteData.is_in_tower_entrance,
    is_inside_tower: acolyteData.is_inside_tower,
  }));
}

export { handleAcolyteTowerAccess };
