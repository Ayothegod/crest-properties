import { actions } from "astro:actions";
// import { navigate } from "astro:transitions/client";

export default function Action() {
    const getAllUsers = async()  => {
    const { data, error } = await actions.getAllUsers();
    console.log(data, error);
    
    return {data, error}
  }

  // getAllUsers.

  // if (getAllUsers.error) return 
  // console.log(data);


  return (
    <div>
      Action Func
      <button
        onClick={async () => {
          const { error, data } = await actions.getAllUsers();
          if (!error) return console.log("ERROR");

          console.log("SUCCESS");
          console.log(data);
        }}
      >
        Get data in button
      </button>
    </div>
  );
}
