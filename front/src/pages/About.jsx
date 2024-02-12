import OutletMainLayout from "../elements/OutletMainLayout";
import OutletPrimaryTab from "../elements/OutletPrimaryTab";
import CustomTitle from "../elements/CustomTitle";
import MessageAbout from "../messageAndError/MessageAbout";

function About() {
  return (
    <OutletMainLayout>
      <OutletPrimaryTab>
        <CustomTitle>About</CustomTitle>
        <MessageAbout message="Questa app nasce come progetto finale per il Master di Full stack developer di Start2Impact University  "></MessageAbout>
      </OutletPrimaryTab>
    </OutletMainLayout>
  );
}

export default About;
