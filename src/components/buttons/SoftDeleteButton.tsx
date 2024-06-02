import {useUpdateCoinMutation} from "../../inventory/queries/coinApi";

const SoftDeleteButton = (props) => {
    const id = props.id;
    const [updateCoin] = useUpdateCoinMutation();

    const handleClick = () => {
        updateCoin({ id, data: { toggle_soft_delete: true } })
          .unwrap()
          .catch((error) => {
            console.error("Failed to soft delete coin: ", error);
          });
      };
    return (
        <button
        className="bg-red-400 px-2 py m-2 rounded-lg text-white border border-red-500 hover:cursor-pointer"
        onClick={() => handleClick()}
        >Delete
           
        </button>
    )
}

export default SoftDeleteButton;