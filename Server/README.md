# HWAPP
제3회 창의융합해커톤 백엔드 서버입니다.<br>
HW Kit, Kit의 Code에 대한 Quiz 등을 제공하는 API서버입니다.

# API
|설명|방식|url|매개변수|리턴|
|------|---|---|---|---|
|키트정보가져오기|GET|/getKitInfo|userId|kitCode, kitName|
|사용자키트등록|POST|	/registUserKit|	userId, kitCode||	
|chpater Step 가져오기|	GET|	/getChapterStep|	userId, kitCode|	chapterStep|
|chpater Step 증가|	PATCH|	/updateChapterStep|	userId, kitCode, step||	
|키트동영상 URL 가져오기|	GET|	/getKitVideoURL|	kitCode|	kitVideoURL|
|Code Step  가져오기|	GET|	/getCodeStep|	userId, kitCode|	codeStep|
|Code Step 증가|	PATCH|	/updateCodeStep|	userId, kitCode, step||	
|Custom Value 가져오기|	GET|	/getCustomValues|	userId, kitCode|	CustomValues|
|Custom Value update|	PATCH|	/updateCustomVlues|	userId, kitCode, customValues|	
|Quiz 정보 가져오기|	GET|	/getQuizIdx|	kitCode|	quizIdx|
|Quiz 질문 가져오기|	GET|	/getQuizQuestion|	quizIdx|	Question|
|Quiz 답변등록|	POST|	/registQuizAnswer|	userId, quizIdx, answer||	
