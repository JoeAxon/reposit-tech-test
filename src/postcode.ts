
function isValidUkPostcode(postcode: string): boolean {
  /**
   * Regular expressions taken from here: https://assets.publishing.service.gov.uk/media/632b07338fa8f53cb77ef6b8/WS02_LRS_Web_Services_Interface_Specification_v6.4.pdf
   */
  const validPostcodes = [
    /^[A-Z]{1,2}[0-9R][0-9A-Z]? ?[0-9][ABDEFGHJLNPQRSTUWXYZ]{2}$/,
    /^BFPO ?[0-9]{1,4}$/,
    /^([AC-FHKNPRTV-Y]\d{2}|D6W)? ?[0-9AC-FHKNPRTV-Y]{4}$/,
  ];

  return validPostcodes.some(regex => regex.test(postcode));
}

export { isValidUkPostcode };
