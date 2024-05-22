import DentistService from "@/service/DentistService";

function getDentistsCount(params) {
    DentistService.getCount()
      .then((response) => {
        return(response.data.data.count);
      })
      .catch((error) => {
        console.error("There was an error fetching the dentists count!", error);
      });
}