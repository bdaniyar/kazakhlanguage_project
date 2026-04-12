from schemas.help import HelpContact

_CONTACTS: list[HelpContact] = [
    HelpContact(
        id="p1",
        type_kz="Психолог",
        title_kz="Мектептегі психолог",
        detail_kz=(
            "Мектеп психолог-педагог қызметкерімен кездесіңіз. "
            "Әдетте мектеп әкімшілігінен байланыс аласыз."
        ),
        phone=None,
    ),
    HelpContact(
        id="h1",
        type_kz="Желі",
        title_kz="«Сақ бол, бала» (үлгі)",
        detail_kz="24 сағат бойы қолдау. Қауіпсіз және анонимді сөйлесуге болады.",
        phone="150",
    ),
    HelpContact(
        id="h2",
        type_kz="Желі",
        title_kz="Психологиялық көмек желісі",
        detail_kz="Стресс, алаңдаушылық немесе көңіл-күй тұрақсыздығы бойынша кеңес.",
        phone="111",
    ),
]


def list_help() -> list[HelpContact]:
    return _CONTACTS
