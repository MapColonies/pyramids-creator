import { get } from 'config';
import { BBox, Polygon } from '@turf/helpers';
import bboxPolygon from '@turf/bbox-polygon';
import area from '@turf/area';
import { IBboxConfig } from '../model/bboxConfig';
import {
  BboxValidationError,
  BboxAreaValidationError,
  BboxLimit,
} from '../requests/errors/export';

export function getPolygon(bbox: number[]): Polygon {
  // Spread 2d bbox and convert to turf type
  const convertedBbox: BBox = [bbox[0], bbox[1], bbox[2], bbox[3]];

  let polygon: Polygon;
  try {
    // Calculate bbox area
    const featurePolygon = bboxPolygon(convertedBbox);
    polygon = featurePolygon.geometry;
  } catch (error) {
    throw new BboxValidationError(error, bbox);
  }
  return polygon;
}

export function validateBboxArea(polygon: Polygon, bbox: number[]): void {
  const config: IBboxConfig = get('bbox');
  const kmSqToMSq = 1000000; // 1000 * 1000
  const limit = config.limit * kmSqToMSq;
  let polygonArea;
  try {
    polygonArea = area(polygon);
  } catch (error) {
    throw new BboxValidationError(error, bbox);
  }
  if (polygonArea > limit) {
    throw new BboxAreaValidationError(bbox, BboxLimit.EXCEEDS);
  } else if (polygonArea < 1) {
    throw new BboxAreaValidationError(bbox, BboxLimit.TOO_SMALL);
  }
}
