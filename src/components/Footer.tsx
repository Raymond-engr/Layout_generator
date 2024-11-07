// In your main layout component
import GridContainer from './GridContainer';
import undo from '../assets/icons/backward.svg';
import redo from '../assets/icons/forward.svg';
import { 
    ActionButton, 
    SizeAdjustButton, 
    AddToCartWithTotal, 
    ActionButtonContainer, 
    ActionLayout 
  } from './ActionButton1';
  
  const Footer = () => {
    return (
      <div className="w-full">
        {/* Top Action Buttons */}
        <ActionLayout>
          <ActionButtonContainer position="top">
            <div className="flex gap-4">
              <ActionButton variant="secondary" icon={undo} />
              <ActionButton label="Redo" variant="secondary" icon={redo} />
            </div>
            
            <div className="flex gap-4">
              <SizeAdjustButton color="increase" />
              <SizeAdjustButton color="decrease" />
            </div>
            
            <div className="flex gap-4">
              <ActionButton label="Reset" variant="secondary" />
              <ActionButton label="Delete" variant="secondary" />
            </div>
          </ActionButtonContainer>
        </ActionLayout>
        <GridContainer />
  
        {/* Your grid layout here */}
  
        {/* Bottom Action Buttons */}
        <ActionLayout>
          <ActionButtonContainer position="bottom">
            <ActionButton label="Randomize" />
            <ActionButton label="Rotate All" />
            <ActionButton label="Save" />
            <AddToCartWithTotal total="€63" />
          </ActionButtonContainer>
        </ActionLayout>
      </div>
    );
  };

  export default Footer;