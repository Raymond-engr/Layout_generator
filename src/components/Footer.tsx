// In your main layout component
import GridContainer from './GridContainer';
import undo from '../assets/icons/backward.svg';
import redo from '../assets/icons/forward.svg';
import increase from '../assets/icons/increase.svg';
import decrease from '../assets/icons/decrease.svg';
import reset from '../assets/icons/refresh.svg';
import remove from '../assets/icons/delete.svg';
import randomize from '../assets/icons/randomise.svg';
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
              <ActionButton variant="secondary" icon={redo} />
            </div>
            
            <div className="flex gap-4">
              <SizeAdjustButton color="increase" icon={increase} />
              <SizeAdjustButton color="decrease" icon={decrease} />
            </div>
            
            <div className="flex gap-4">
              <ActionButton variant="secondary" icon={reset} />
              <ActionButton variant="secondary" icon={remove} />
            </div>
          </ActionButtonContainer>
        </ActionLayout>
        <GridContainer />
  
        {/* Your grid layout here */}
  
        {/* Bottom Action Buttons */}
        <ActionLayout>
          <ActionButtonContainer position="bottom">
            <ActionButton label="Randomize" icon={randomize}/>
            <ActionButton label="Rotate All" />
            <ActionButton label="Save" />
            <AddToCartWithTotal total="€63" />
          </ActionButtonContainer>
        </ActionLayout>
      </div>
    );
  };

  export default Footer;