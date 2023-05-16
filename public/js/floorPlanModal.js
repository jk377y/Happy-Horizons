// modal to open floor plan images
function openModal(imageUrl) {
	const modal = document.getElementById("floorPlanModal");
	const modalImage = modal.querySelector(".modal-image");
	modalImage.src = `../../../images/floorPlans/${imageUrl}`;
	modal.style.display = "block";
}

// event listener for close button
const closeModal = document.getElementById("close");
closeModal.addEventListener("click", () => {
	const modal = document.getElementById("floorPlanModal");
	modal.style.display = "none";
});
