import * as songServices from '../services/service.song';
import Response from '../../lib/http/lib.http.response';

const checkIfIdExists = async (req, res, next) => {
  let { id } = req.query;
  let existingId = await songServices.getAllSongIds(id);
  if (!existingId) {
    return Response.error(res, 'the song you are searching for is not available', 401);
  }
  return next();
};

export default { checkIfIdExists };
