import handleArtifactsSearchValidationResetManaged from '../../../socket/handlers/artifacts-search-validation-reset-managed';

const setModalData = jest.fn();
const setAcolytes = jest.fn();
const setArtifacts = jest.fn();

describe('handleArtifactsSearchValidationResetManaged', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should reset the search when the acolyte has not completed the artifact search', () => {
    handleArtifactsSearchValidationResetManaged(
      false,
      setModalData,
      setAcolytes,
      setArtifacts,
    );

    expect(setModalData).toHaveBeenCalled();
    expect(setAcolytes).toHaveBeenCalled();
    expect(setArtifacts).toHaveBeenCalled();
  });

  it('should validate the search when the acolyte has completed the artifact search', () => {
    handleArtifactsSearchValidationResetManaged(
      true,
      setModalData,
      setAcolytes,
      setArtifacts,
    );

    expect(setModalData).toHaveBeenCalled();
    expect(setAcolytes).toHaveBeenCalled();
    expect(setArtifacts).not.toHaveBeenCalled();
  });
});
