export interface Settings {
  settingsName: SettingsName
  [property: string]: any
}

export enum SettingsName {
  AutoFeedLink = 'auto_feed_link',
  AutoUploadScreenshot = 'auto_upload_screenshot',
  DeleteScreenshot = 'delete_screenshot',
  DoGetThumbnail = 'do_get_thumbnail',
  EnableApi = 'enable_api',
  FileNameMovie = 'file_name_movie',
  FileNamePlaylet = 'file_name_playlet',
  FileNameTv = 'file_name_tv',
  MainTitleMovie = 'main_title_movie',
  MainTitlePlaylet = 'main_title_playlet',
  MainTitleTv = 'main_title_tv',
  MakeDir = 'make_dir',
  MediaInfoSuffix = 'media_info_suffix',
  OpenAutoFeedLink = 'open_auto_feed_link',
  PasteScreenshotUrl = 'paste_screenshot_url',
  PictureBedApiToken = 'picture_bed_api_token',
  PictureBedApiUrl = 'picture_bed_api_url',
  PtGenApiUrl = 'pt_gen_api_url',
  RenameFile = 'rename_file',
  ScreenshotEndPercentage = 'screenshot_end_percentage',
  ScreenshotNumber = 'screenshot_number',
  ScreenshotStartPercentage = 'screenshot_start_percentage',
  ScreenshotStoragePath = 'screenshot_storage_path',
  ScreenshotThreshold = 'screenshot_threshold',
  SecondConfirmFileName = 'second_confirm_file_name',
  SecondTitleMovie = 'second_title_movie',
  SecondTitlePlaylet = 'second_title_playlet',
  SecondTitleTv = 'second_title_tv',
  ThumbnailCols = 'thumbnail_cols',
  ThumbnailDelay = 'thumbnail_delay',
  ThumbnailRows = 'thumbnail_rows',
  TorrentStoragePath = 'torrent_storage_path',
}
