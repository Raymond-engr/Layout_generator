// In your main layout component
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
              <ActionButton label="Undo" variant="secondary" />
              <ActionButton label="Redo" variant="secondary" />
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