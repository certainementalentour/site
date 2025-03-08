// Désactiver le clic droit
document.addEventListener('contextmenu', (event) => {
	event.preventDefault();
  }, false);
  
  // Désactiver les touches
  document.addEventListener('keydown', (event) => {
	// F12
	if (event.key === "F12") {
	  event.preventDefault();
	  return false;
	}
	
	// F5
	if (event.key === "F5") {
	  event.preventDefault();
	  return false;
	}
	
	// Ctrl+R
	if (event.ctrlKey && (event.key === "r" || event.key === "R")) {
	  event.preventDefault();
	  return false;
	}
	
	// F11
	if (event.key === "F11") {
		event.preventDefault();
		return false;
	}

	// Échap
	if (event.key === "Escape") {
	  event.preventDefault();
	  return false;
	}
  }, false);
  