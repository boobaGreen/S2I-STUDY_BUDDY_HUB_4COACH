import { useMain } from "../contexts/MainContext";
import CustomTitle from "../elements/CustomTitle";

function MiniPanel() {
  const { groupsActive } = useMain();
  return (
    <div>
      {groupsActive >= 3 && (
        <CustomTitle size="medium">
          <span>🛑</span>
        </CustomTitle>
      )}

      <CustomTitle size="small">
        <span> {groupsActive} </span> / 3 max - groups
      </CustomTitle>
    </div>
  );
}

export default MiniPanel;
