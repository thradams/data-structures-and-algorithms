#include <stdlib.h>
#include <assert.h>
#include <errno.h>
#include <stdio.h>
#include <limits.h>
#include <string.h>

#ifdef _MSC_VER
#define strdup _strdup
#endif

struct book {
    char* title;
};


void book_delete(struct book* book)
{
    if (book) {
       free(book->title);
    }
}

struct books {
    struct book** data;
        int size;
        int capacity;
};

int books_reserve(struct books* p, int n)
{
        if (n > p->capacity) {

            const size_t new_size_bytes = (size_t)n * sizeof(p->data[0]);
            void* pnew = realloc(p->data, new_size_bytes);
            if (pnew == NULL) return ENOMEM;

            p->data = pnew;
            p->capacity = n;
        }

        return 0;
}



[[nodiscard]]
int books_push_back(struct books* p, struct book* book)
{
        if (p->size == INT_MAX) {
            return EOVERFLOW;
        }

        if (p->size + 1 > p->capacity) {

            unsigned long long new_capacity = p->capacity + p->capacity / 2;


            if (new_capacity < p->size + 1) {
                new_capacity = p->size + 1;
            }
            else if (new_capacity > INT_MAX) {
               new_capacity = INT_MAX;
            }

       int error = books_reserve(p, (int)new_capacity);
            if (error != 0) {
                return error;
            }
        }


       /*
         after move (on success) the object book cannot be used 
         anymore. But we can still call destroy on it (with no effect)
         just for state simplification.
       */

    p->data[p->size] = book; /*MOVED*/
        p->size++;

        return 0;
}

void books_destroy(struct books* books)
{

    for (int i = 0; i < books->size; i++) {
        book_delete(books->data[i]);
    }
    free(books->data);
}

#define try  if (1)
#define throw goto CATCH
#define catch else CATCH:

int main()
{
   struct books books = { 0 };


  struct book* book = NULL;
  try
  {
    book = calloc(1, sizeof (struct book));
    if (book == NULL) throw;
    book->title = strdup("book1");
    if (book->title == NULL) throw;
    if (books_push_back(&books, book) == 0)
    {
      book = NULL; /*MOVED*/
    }
  }
  catch
  {
  }

  book_delete(book);
  books_destroy(&books);
}
