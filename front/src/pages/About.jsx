import OutletMainLayout from "../elements/OutletMainLayout";
import OutletPrimaryTab from "../elements/OutletPrimaryTab";
import CustomTitle from "../elements/CustomTitle";

function About() {
  return (
    <OutletMainLayout>
      <OutletPrimaryTab>
        <CustomTitle>About</CustomTitle>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente
          recusandae, necessitatibus perferendis labore culpa unde nisi
          explicabo cupiditate suscipit reprehenderit illo architecto fugit
          natus id ipsa magnam ea eos a.
        </p>
      </OutletPrimaryTab>
    </OutletMainLayout>
  );
}

export default About;
