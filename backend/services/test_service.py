QUESTION_COUNT = 6
MAX_PER_ANSWER = 3


def validate_answers(answers: list[int]) -> None:
    if len(answers) not in (6, 7):
        raise ValueError("6 немесе 7 жауап керек")
    for a in answers:
        if a < 0 or a > MAX_PER_ANSWER:
            raise ValueError("Әрбір жауап 0–3 аралығында болуы керек")


def compute_stress_result(answers: list[int]) -> tuple[int, int, str, str, str]:
    validate_answers(answers)
    score = sum(answers[:QUESTION_COUNT])
    max_score = QUESTION_COUNT * MAX_PER_ANSWER

    if score <= max_score * 0.33:
        level_key = "low"
        label = "Төмен деңгей"
        msg = (
            "Сізде стресс белгілері аз байқалады. Деңгейіңізді сақтау үшін "
            "демалу, ұйқы және жаттығуды ұмытпаңыз."
        )
    elif score <= max_score * 0.66:
        level_key = "medium"
        label = "Орта деңгей"
        msg = (
            "Стресс орташа деңгейде. Тыныштық пен дем алу стратегияларын "
            "пайдаланыңыз, қажет болса маманмен сөйлесіңіз."
        )
    else:
        level_key = "high"
        label = "Жоғары деңгей"
        msg = (
            "Стресс жоғары. Өзіңізді жалғыз қалдырмаңыз: сенімді адамдардан "
            "немесе көмек желілерінен қолдау сұраңыз."
        )

    return score, max_score, level_key, label, msg
